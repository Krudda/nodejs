import { createReadStream, createWriteStream } from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import csvtojson from 'csvtojson';

const __dirname = dirname(fileURLToPath(import.meta.url));
const writeFilepath = __dirname + "/parsed.txt";
const readFilePath = __dirname + '/csv/library.csv';

const parseFile = async () => {
	const readStream = createReadStream(readFilePath);
	const writeStream = createWriteStream(writeFilepath);

	readStream
		.pipe(csvtojson())
		.on('data', async data => {
			console.log('data', data.toString());
			writeStream.write(data);
		})
		.on('error', (err) => {
			console.error('Failed to parse file')
		})
		.on('end', () => {
			console.log('File successfully parsed')
		});
}

await parseFile();