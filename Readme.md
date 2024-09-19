# Typescript o1-preview-local

I made this package as a way for you to quickly stand up a local instance of o1-preview because there are limits for it from OpenAI.

If you have an o1-preview capable key, add it to your .env as OPENAI_API_KEY.

## Use

In `index.ts` there is a line `const chatId = 0;` - change this integer to create new chats.

Ensure that, before running the package, you have created the matching `x.json` and `x.txt` files in the folders `chats` and `outputs`, respectively.

Change the contents of `input.txt` and run `npm dev` to begin the completion.

Feel free to edit anything in this package.

## Support

No, please fork it and release your fixes on your own.

## License

MIT License

Copyright (c) 2024 Mackenzie Bowes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
