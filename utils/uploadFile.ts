export function getFileData(file: File, setFileString) {
	const file_reader = new FileReader()
	file_reader.onload = (e) => {
		setFileString(e.target?.result as string)
	}
	file_reader.readAsDataURL(file)
}

export function onFileChange(file: File, setFileName, setFileFilled, setFile, fileToDataUrl = false) {
	if(file) {
		setFileName(file.name)
		setFileFilled(true)
		//getFileData(file, setFileString)
	}
	if(fileToDataUrl){
		getFileData(file, setFile)
	} else{
		setFile(file)
	}
}