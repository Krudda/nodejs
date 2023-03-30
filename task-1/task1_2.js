import { createReadStream, createWriteStream } from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import csvtojson from 'csvtojson';
import { pipeline } from "stream/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const writeFilepath = __dirname + "/parsed.txt";
const readFilePath = __dirname + '/csv/library.csv';

const parseFile = async () => {
	try {
		pipeline(
			createReadStream(readFilePath), 
			csvtojson({ delimiter: ';' }),
			createWriteStream(writeFilepath)
		)
		console.log('File parsed');
	} catch {
		console.error('Failed to parse file')
	}
}

await parseFile();