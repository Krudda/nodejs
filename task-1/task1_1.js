console.log("Write something:");

const task1_1 = () => {
    process.stdin.on("data", data => {
        const reverse = data.toString().split('').reverse().join('');
        process.stdout.write(reverse + "\n");
    })
}

task1_1();