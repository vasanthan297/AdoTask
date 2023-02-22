import tl = require('azure-pipelines-task-lib/task');

async function run() {
    try {
        const inputString: string | undefined = tl.getInput('samplestring', true);
        if (inputString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
       
        const endpointId: string | undefined = tl.getInput('NexusIQ', true);
        if (endpointId) {
            const endpointAuth: tl.EndpointAuthorization | undefined = tl.getEndpointAuthorization(endpointId, false);
            if (endpointAuth && endpointAuth.scheme !== "UsernamePassword") {
                tl.setResult(tl.TaskResult.Failed, "Service connection does not use username/password authentication.");
                return;
            } else if(endpointAuth){
                const username: string = endpointAuth.parameters.username;
                const password: string = endpointAuth.parameters.password;
                const url = tl.getEndpointUrl(endpointId, false);
                tl.debug(`Username: ${username}`);
                tl.debug(`Password: ${password}`);
                console.log(username) 
                console.log(password)
                console.log(url)
            } else {
                console.error('endpointAuth object not found............')
            }
        } else {
            console.error(`Authorization for endpoint '${endpointId}' not found.`);
        }
        
        
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();