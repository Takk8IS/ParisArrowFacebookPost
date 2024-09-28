function smoothScroll() {
    return new Promise(async (resolve) => {
        let totalScrollHeight = 10 * window.innerHeight;
        let scrolledHeight = 0;
        const scrollStep = window.innerHeight;

        while (scrolledHeight < totalScrollHeight) {
            window.scrollBy(0, scrollStep);
            scrolledHeight += scrollStep;
            await new Promise((resolve) => setTimeout(resolve, 1));
        }

        resolve();
    });
}

async function checkForSponsoredContent() {
    while (true) {
        const articleDivs = document.querySelectorAll('div[role="article"]');
        let sponsoredFound = false;

        for (const articleDiv of articleDivs) {
            if (articleDiv.innerHTML.includes("<span>Sponsored</span>")) {
                sponsoredFound = true;
                // alert("Sponsored content found!");

                const actionsButton = articleDiv.querySelector(
                    'div[aria-label="Actions for this post"]',
                );
                if (actionsButton) {
                    actionsButton.click();
                    // alert("Clicked on 'Actions for this post'");

                    await new Promise((resolve) => setTimeout(resolve, 1000));

                    const menu = document.querySelector(
                        'div[aria-label="Feed story menu"]',
                    );
                    if (menu) {
                        const reportAdOption = Array.from(
                            menu.querySelectorAll('div[role="menuitem"]'),
                        ).find((item) =>
                            item.textContent.includes("Report ad"),
                        );

                        if (reportAdOption) {
                            // alert("'Report ad' option found!");
                            reportAdOption.click();
                            // alert("Clicked on 'Report ad'");

                            await new Promise((resolve) =>
                                setTimeout(resolve, 2000),
                            );

                            const otherOption = Array.from(
                                document.querySelectorAll(
                                    'div[role="listitem"]',
                                ),
                            ).find((item) =>
                                item.textContent.includes("Other"),
                            );

                            if (otherOption) {
                                // alert("'Other' option found!");
                                const specificOtherButton =
                                    document.querySelector(
                                        ".x1n2onr6:nth-child(11) .x1i10hfl > .x9f619 > .x9f619",
                                    );
                                if (specificOtherButton) {
                                    specificOtherButton.click();
                                } else {
                                    otherOption.click();
                                }
                                // alert("Clicked on 'Other'");

                                await new Promise((resolve) =>
                                    setTimeout(resolve, 1000),
                                );

                                const doneButton = document.querySelector(
                                    'div[aria-label="Done"][role="button"]',
                                );

                                if (doneButton) {
                                    doneButton.click();
                                    let totalScrollHeight =
                                        10 * window.innerHeight;
                                    let scrolledHeight = 0;
                                    const scrollStep = window.innerHeight;

                                    while (scrolledHeight < totalScrollHeight) {
                                        window.scrollBy(0, scrollStep);
                                        scrolledHeight += scrollStep;
                                        await new Promise((resolve) =>
                                            setTimeout(resolve, 1),
                                        );
                                    }
                                } else {
                                    // alert("'Done' button not found");
                                }
                            } else {
                                // alert("'Other' option not found");
                            }
                        } else {
                            // alert("'Report ad' option not found in the menu");
                        }
                    } else {
                        // alert("Feed story menu not found");
                    }
                } else {
                    // alert("'Actions for this post' button not found");
                }

                break;
            }
        }

        if (!sponsoredFound) {
            await smoothScroll();
            await new Promise((resolve) => setTimeout(resolve, 1));
        }
    }
}

function startShootingArrow() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: checkForSponsoredContent,
        });
    });
}

document
    .getElementById("startShootingArrow")
    .addEventListener("click", startShootingArrow);

document
    .getElementById("stopShootingArrow")
    .addEventListener("click", function () {
        console.log("Stopping not implemented yet");
    });
