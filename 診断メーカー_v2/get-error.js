fetch('https://api.github.com/repos/c0a250578c/A-bad-diagnosis/actions/runs')
  .then(r => r.json())
  .then(async d => {
    const run = d.workflow_runs[0];
    console.log('Latest Run Name:', run.name, 'Status:', run.status, 'Conclusion:', run.conclusion);
    const res = await fetch(run.jobs_url);
    const jobs = await res.json();
    jobs.jobs?.forEach(j => {
      console.log('  Job:', j.name, 'Status:', j.status, 'Conclusion:', j.conclusion);
      if (j.conclusion === 'failure') {
        const failedStep = j.steps.find(s => s.conclusion === 'failure');
        console.log('    Failed Step:', failedStep?.name);
      }
    });
  }).catch(console.error);
