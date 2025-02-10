fetchHomePage();

async function fetchHomePage() {


  try {
    const response = await fetch("https://www.reddit.com/r/Home.json");
    if (!response.ok) {
      throw new Error("Could not fetch");
    }

    const json = await response.json();
    console.log(json);

  } catch (error) {
    console.error(error.message);
  }
}