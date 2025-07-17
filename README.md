# Momentum Automation Tools

This project provides automation tools for various tasks of Momentum campaign in Galxe.

### Supported Galxe Tasks

This tool supports automating 5 types of Galxe tasks, including claiming points for eligible campaigns. Each task is handled via scripts that interact with the Galxe platform to streamline your workflow.

#### Campaigns

The following campaigns are supported by the automation tool:

-   **Follow Momentum, Follow on X and Visit Telegram**
-   **Visit Momentum Website, Medium, and LinkedIn**
-   **Like and Retweet Momentum Tweets**
-   **Solve Momentum Quizzes**
-   **Claim Points for eligible Campaigns**

Each campaign includes a set of automated tasks that the tool will execute for you.

### Prerequisites

You need to declare your account in an `account.json` file with the following fields: `id`, `email`, `seedPhrase`, `privateKey`, and `xNetwork` account.

### Installation

```bash
npm install
```

### Configuration

-   Set your `SOLVE_CAPTCHA_API_KEY` in the `.env` file to enable captcha solving.
-   Update the Chrome executable path in the `src/core/basicOperations/browser.js` file to match your local Chrome installation.

Example Chrome path update in the `browser.js` file:

```js
executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
```

### Running the Project

```bash
npm run dev
```
