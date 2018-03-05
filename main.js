    const readline = require('readline');
    const {log, biglog,errorlog,colorize} = require('./out')
    const cmds = require('./cmds');
    const model = require('./model');


    /**
     * Mensaje inicial
     */
biglog('CORE quiz', 'green');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: colorize ("quiz>", 'blue'),
        completer(line) {
        const completions = 'help h test delete quit q add list play p test show edit credits'.split(' ');
        const hits = completions.filter((c) => c.startsWith(line));
        // show all completions if none found
        return [hits.length ? hits : completions, line];
    }
    });

    rl.prompt();

    rl.on('line', (line) => {

        let args = line.split(" ");
        let cmd = args[0].toLocaleLowerCase().trim();

        switch (cmd) {
            case '':
                rl.prompt();
                break;
            case 'h':
            case 'help':
                cmds.helpCmd(rl);
                break;
            case'q':
            case'quit':
                cmds.quitCmd(rl);
                break;
            case 'add':
                cmds.addCmd(rl);
                break;
            case 'list':
                cmds.listCmd(rl);
                break;
            case 'test':
                cmds.testCmd(rl,args[1]);
                break;
            case 'play':
            case 'p':
                cmds.playCmd(rl);
                break;
            case 'show':
                cmds.showCmd(rl,args[1]);
                break;
            case 'delete':
                cmds.deleteCmd(rl, args[1]);
                break;
            case 'edit':
                cmds.editCmd(rl, args[1]);
                break;
            case 'credits':
                cmds.reditsCmd(rl);
                break;
            default:
                console.log(`Comando desconocido '${colorize(cmd, 'red')}'`)
                console.log('Use help para ver todos los comandos desconocidos');
                rl.prompt();
                break;

    }
    }).on('close', () => {
        console.log('Adios!');
    process.exit(0);
    });
