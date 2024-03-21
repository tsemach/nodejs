const jestModule = require('jest');

async function runTests() {
    const options = {
        // Add your Jest options here
        projects: [process.cwd()],
    };

    try {
        await jestModule.runCLI(options, options.projects);
        console.log('Tests completed successfully');
    } catch (error) {
        console.error('Failed to run tests:', error);
    }
}

runTests();
