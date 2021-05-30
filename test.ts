function run(num) {
    const len = Math.ceil(Math.log10(num + 1));
    const rounded = num % len //Math.ceil(Math.round(num / len))
    let stripped = rounded % Math.random() * 10 + 10
    let speed = parseInt(stripped)
    console.log(len, rounded, speed);
}

run(30408645455586842267149744651491871299231676451822086397537282110880836500355 )
