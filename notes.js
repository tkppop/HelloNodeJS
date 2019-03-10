const fs = require('fs')
const chalk = require('chalk')

//This is a way of defining a function in ES6
const addNotes = (title, body) => {
	const newnote = {
		 title:title,
		 body:body
	}
	console.log(newnote)
	var notesData = loadNotes()
	//find if title already exists
	const result = notesData.find((temp3) => temp3.title == title)
	if (result == undefined){
		notesData.push(newnote)
		const temp1 = JSON.stringify(notesData,null,'\t')
		fs.writeFileSync('notes.json',temp1)
		console.log(chalk.green.inverse('Note successfully added!'))
	} else {
		console.log(chalk.red.inverse('Note title already exists!'))
	}
}

const removeNote = (title) => {
	var notesData = loadNotes()
	const newNotesData = notesData.filter((temp3) => temp3.title != title)
	try{
		const temp1 = JSON.stringify(newNotesData,null,'\t')
		fs.writeFileSync('notes.json',temp1)
		if (notesData.length > newNotesData.length){
			console.log(chalk.magenta.inverse('Note successfully removed!'))
		} else {
			console.log(chalk.yellow.inverse('No note found with that title!'))
		}
	} catch (error){
		console.log('error writing notes.json')
	}
}

const getNotes = () => {
	var temp2 = loadNotes()
	console.log(chalk.magenta('Your Notes,'))
	temp2.forEach((temp) => {
		console.log(chalk.cyan(temp.title),' - ',chalk.yellow(temp.body))
	})
}

const readNote = (title) => {
	var temp2 = loadNotes()
	var result = temp2.find((temp) => temp.title == title)
	if (result == undefined) {
		console.log('No note with that title')
	} else {
		console.log('Here is your note,')
		console.log(result)
	}
}

const loadNotes = ()=> {
	try {
		const file = fs.readFileSync('notes.json')
		const fileJSON = file.toString()
		const data = JSON.parse(fileJSON)
		return data
	} catch (error){
		console.log('notes.json is empty!')
		return []
	}
}

module.exports = {
	getNotes: getNotes,
	addNote: addNotes,
	removeNote: removeNote,
	readNote : readNote
}