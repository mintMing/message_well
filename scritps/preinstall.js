const isPnpm = process.argv.some((arg) => arg.includes("pnpm"));

if (!isPnpm) {
    console.warn(
        `\u001b[33mThis repository must use pnpm as the package manager ` +
            `for scripts to work properly.\u001b[39m\n`,
    );
    process.exit(1);
}
