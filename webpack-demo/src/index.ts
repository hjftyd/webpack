
async function main() {
    function test(a: string) {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                alert("Hello!")
                // resolve(12);
                reject("ERRROR")
            }, 3000)
        });
    }

    try {
        const result = await test("fff");
    } catch (error) {
        console.log(error)
    }
}

// main();