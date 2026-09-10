# Your Digital Haven

https://www.moxera.org

Nitengenezee website kama hii, weka Kila kitu

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://moxeraagencieonline.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6bdf9537-79a1-4039-b8aa-c2d52ec3e2f6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```


## Moxera registration & Mobilipa setup

- Registration is now handled by the internal `/jisajili` page.
- Registration details needed for payment are saved in browser `localStorage`.
- The registration confirmation popup sends the user to `/malipo`.
- Activation/payment amount is fixed at **TZS 16,000**.
- `LIPA SASA` sends a Mobilipa USSD Push to the submitted phone number.
- WhatsApp and SMS floating buttons have been removed.
- Replace `public/uploads/registration-image.jpg` and `public/uploads/pesa-image.jpg` to change the website images.
- Configure the server environment variable `MOBILIPA_API_KEY`; never put the secret key in frontend/public files.
- Mobilipa API documentation: https://mobilipa.store/api-docs
