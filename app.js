
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
     title: {
      describe: 'Note title',
      demandOption : true,
      type: 'String'
     },
     body: {
      describe: 'Note body',
      demandOption : true,
      type: 'String'
     }
    },
    handler(argv) {
        console.log('Adding a new note with title: ', argv.title, ' and body: ', argv.body )
        //const notesData = notes.addNote(argv.title,argv.body)
        notes.addNote(argv.title,argv.body)
    }
})
yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder: {
        title : {
            describe: 'Note title',
            demandOption : true,
            type: 'String'
        }
    },
    handler(argv) {
        console.log('Removing a note with title: ' + argv.title )
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'Listing all notes',
    handler() {
        notes.getNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Reading a note',
    builder: {
        title : {
            describe: 'Note title',
            demandOption : true,
            type: 'String'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.demandCommand(1, 'You need at least one command for this app')
yargs.parse()
// yargs.argv same as above
// console.log(yargs.argv)

