# Magical Baby Name Finder

**Magical Baby Name Finder** is a Next.js application designed to help parents find unique and meaningful Indian baby names based on their specific preferences. Leveraging the power of Anthropic's Claude 3.5 Sonnet AI model, this tool provides personalized name suggestions tailored to criteria such as gender, starting letter, mother tongue, parents' names, and desired meanings.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **Interactive Wizard:** Guides users through a step-by-step form to gather preferences.
- **AI-Powered Suggestions:** Generates unique baby names using Anthropic's Claude 3.5 Sonnet model.
- **Feedback Mechanism:** Allows users to provide feedback to refine future name suggestions.
- **Generate More Names:** Users can request additional name suggestions without repeating previous ones.
- **Responsive Design:** Ensures a seamless experience across various devices.
- **Visual Feedback:** Provides visual cues when selecting gender options.

## Technology Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes
- **AI Integration:** Anthropic's Claude 3.5 Sonnet via `@ai-sdk/anthropic`
- **Icons:** Lucide React Icons
- **Styling:** Tailwind CSS

## Installation

### Prerequisites

- **Node.js:** Ensure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **npm or Yarn:** Package managers for installing dependencies.

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/magical-baby-name-finder.git
   cd magical-baby-name-finder
   ```

2. **Install Dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables:**

   Create a `.env.local` file in the root directory and add your Anthropic API key:

   ```env
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

   Replace `your_anthropic_api_key_here` with your actual Anthropic API key.

4. **Run the Development Server:**

   Using npm:

   ```bash
   npm run dev
   ```

   Or using Yarn:

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Configuration

### Environment Variables

- **ANTHROPIC_API_KEY:** Your API key for Anthropic's AI services.

Ensure that the `.env.local` file is correctly set up with your Anthropic API key as shown in the [Installation](#installation) section.

## Usage

1. **Access the Application:**

   Open [http://localhost:3000](http://localhost:3000) in your web browser.

2. **Provide Preferences:**

   - **Gender:** Select whether your little one is a "Little Prince" or "Little Princess". The selected option will be highlighted for visual feedback.
   - **Starting Letter:** Optionally, specify a starting letter for the baby's name.
   - **Mother Tongue:** Enter the language that sings in your family.
   - **Father's Name:** Input the father's name.
   - **Mother's Name:** Input the mother's name.
   - **Desired Meaning:** Optionally, specify a desired meaning (e.g., strength, love, wisdom).

3. **Generate Names:**

   - After completing all steps, click on **Find Magic Names** to generate name suggestions.
   - Review the generated names along with their meanings.

4. **Generate More Names:**

   - Click on **Generate More** to receive additional name suggestions based on your original preferences.
   - Optionally, provide feedback in the text input to refine future suggestions.
   - To restart the process, click on **Start Over**.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository.**
2. **Create a Branch:**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Commit Your Changes:**

   ```bash
   git commit -m "Add YourFeatureName"
   ```

4. **Push to the Branch:**

   ```bash
   git push origin feature/YourFeatureName
   ```

5. **Open a Pull Request:** Navigate to the repository on GitHub and create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- **Anthropic:** For providing the Claude 3.5 Sonnet AI model.
- **Build Fast with AI:** [Build Fast with AI](https://www.buildfastwithai.com/genai-course) for their GenAI course.
- **Lucide Icons:** For the beautiful icons used in the application.

---

_Enjoy finding the perfect name for your little one!_
