fetch('https://api.github.com/repos/c0a250578c/A-bad-diagnosis/actions/runs')
  .then(r => r.json())
  .then(async d => {
    for (const run of d.workflow_runs.slice(0, 3)) {
      console.log('--- Run:', run.name, 'Status:', run.status, 'Conclusion:', run.conclusion);
      const res = await fetch(run.jobs_url);
      const jobs = await res.json();
      jobs.jobs?.forEach((j: any) => {
        console.log('  Job:', j.name, 'Status:', j.status, 'Conclusion:', j.conclusion);
        if (j.conclusion === 'failure') {
          const failedStep = j.steps.find((s: any) => s.conclusion === 'failure');
          console.log('    Failed Step:', failedStep?.name);
        }
      });
    }
  }).catch(console.error);
