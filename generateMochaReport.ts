import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import * as glob from 'glob';

function findJsonFilesRecursively(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  let results: string[] = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      results = results.concat(findJsonFilesRecursively(itemPath));
    } else if (item.endsWith('.json')) {
      results.push(itemPath);
    }
  }

  return results;
}

async function generateReport() {
  try {
    const cwd = process.cwd();
    const reportsDir = path.join(process.cwd(), 'reports');
    const mochaDir = path.join(reportsDir, 'mocha');
    const mergedReportPath = path.join(reportsDir, 'mochawesome.json');
    const htmlReportDir = path.join(reportsDir, 'html');
    
    console.log('Current working directory:', cwd);
    console.log('Reports directory:', reportsDir);
    console.log('Mocha directory:', mochaDir);

    if (fs.existsSync(mergedReportPath)) {
      fs.unlinkSync(mergedReportPath);
    }

    [reportsDir, mochaDir, htmlReportDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
      }
    });

    console.log(`Scanning for JSON reports in: ${mochaDir}`);
    
    let reportFiles: string[] = [];
    
    const potentialLocations = [
      mochaDir,
      path.join(process.cwd(), 'features', 'html', 'mocha'),
      path.join(process.cwd(), 'cypress', 'reports'),
      path.join(process.cwd(), 'mochawesome-report'),
      process.cwd()
    ];
    
    console.log('Searching for report files in multiple locations...');
    
    for (const location of potentialLocations) {
      console.log(`Checking location: ${location}`);
      
      if (fs.existsSync(location)) {
        const files = findJsonFilesRecursively(location)
          .filter(file => {
            const fileName = path.basename(file).toLowerCase();
            return fileName.includes('mochawesome') || 
                   fileName.includes('report') || 
                   (fileName.includes('mocha') && fileName.endsWith('.json'));
          });
        
        if (files.length > 0) {
          console.log(`Found ${files.length} JSON files in ${location}`);
          reportFiles = files;
          break;
        }
      }
    }
    
    if (reportFiles.length === 0) {
      throw new Error(`No JSON report files found in any of the searched locations. Please run tests first with 'npx cypress run' or specify the exact location of your report files.`)
    }
    
    console.log(`Found ${reportFiles.length} report files:\n${reportFiles.join('\n')}`);
    
    if (!reportFiles[0].startsWith(mochaDir)) {
      console.log(`Copying report files to ${mochaDir}...`);
      reportFiles.forEach(file => {
        const destFile = path.join(mochaDir, path.basename(file));
        fs.copyFileSync(file, destFile);
        console.log(`Copied ${file} to ${destFile}`);
      });
    }

    console.log('Merging JSON reports...');
    
    const tempFilePath = path.join(reportsDir, 'reports-to-merge.json');
    fs.writeFileSync(tempFilePath, JSON.stringify(reportFiles));
    
    console.log('Merging JSON reports using file list...');
    
    try {
      const fileList = reportFiles.map(file => `"${file}"`).join(' ');
      const mergeCmd = `npx mochawesome-merge ${fileList} > "${mergedReportPath}"`;
      console.log('Executing merge command (method 1):', mergeCmd);
      
      try {
        execSync(mergeCmd, { 
          stdio: 'inherit',
          shell: process.platform === 'win32' ? 'cmd.exe' : '/bin/sh'
        });
      } catch (error) {
        console.log('Method 1 failed, trying method 2...');
        
        console.log('Manually merging report files...');
        
        const reports = reportFiles.map(file => {
          try {
            const content = fs.readFileSync(file, 'utf8');
            return JSON.parse(content);
          } catch (e) {
            console.error(`Error reading file ${file}:`, e);
            return null;
          }
        }).filter(r => r !== null);
        
        if (reports.length === 0) {
          throw new Error('No valid report files could be parsed');
        }
        
        const mergedReport = reports[0];
        
        if (reports.length > 1) {
          for (let i = 1; i < reports.length; i++) {
            if (mergedReport.stats && reports[i].stats) {
              mergedReport.stats.suites += reports[i].stats.suites;
              mergedReport.stats.tests += reports[i].stats.tests;
              mergedReport.stats.passes += reports[i].stats.passes;
              mergedReport.stats.failures += reports[i].stats.failures;
              mergedReport.stats.pending += reports[i].stats.pending;
              mergedReport.stats.duration = Math.max(mergedReport.stats.duration, reports[i].stats.duration);
            }
            
            if (reports[i].results && mergedReport.results) {
              mergedReport.results.push(...reports[i].results);
            }
          }
        }
        
        fs.writeFileSync(mergedReportPath, JSON.stringify(mergedReport, null, 2));
        console.log(`Manually merged ${reports.length} report files to ${mergedReportPath}`);
      }
    } catch (error) {
      console.error('Both merge methods failed:', error);
      
      console.log('Falling back to using first report file...');
      fs.copyFileSync(reportFiles[0], mergedReportPath);
      console.log(`Copied ${reportFiles[0]} to ${mergedReportPath} as fallback`);
    }

    if (!fs.existsSync(mergedReportPath)) {
      throw new Error(`Failed to create merged report at: ${mergedReportPath}`);
    }
    
    console.log(`Merged report created at: ${mergedReportPath}`);

    console.log('Generating HTML report...');
    const margeCmd = `npx marge "${mergedReportPath}" ` +
      `--reportDir "${htmlReportDir}" ` +
      `--inline ` +
      `--charts ` +
      `--reportTitle "Cypress Cucumber TypeScript Tests" ` +
      `--reportFilename index.html`;
      
    console.log('Executing marge command:', margeCmd);
    
    execSync(margeCmd, { 
      stdio: 'inherit',
      shell: process.platform === 'win32' ? 'cmd.exe' : '/bin/sh'
    });

    const reportPath = path.join(htmlReportDir, 'index.html');
    
    if (fs.existsSync(reportPath)) {
      console.log('Opening HTML report...');
      const openCommand = process.platform === 'win32' 
        ? `start "" "${reportPath}"`
        : `open "${reportPath}"`;
      
      execSync(openCommand, { 
        stdio: 'inherit',
        shell: process.platform === 'win32' ? 'cmd.exe' : '/bin/sh'
      });
      console.log(`Report successfully generated at: ${reportPath}`);
    } else {
      throw new Error(`HTML report generation failed - missing file: ${reportPath}`);
    }
  } catch (error) {
    console.error('Error generating report:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

generateReport();
