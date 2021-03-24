
let promiseTest = new Promise(resolve => {
  setTimeout(() => {
    resolve("Hello world");
    return "Foobar";
  }, 1000);
  return "apple";
});

async function main() {
  // let f = await promiseTest;
  // console.log(f);

  promiseTest.then(f => {
    console.log(f);
  });

  return "Main output";
}

/// Simulate main function
(async () => {
  try {
      var text = await main();
      console.log(text);
  } catch (e) {
      console.log("Exception", e)
  }
})();