export const generateID = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // ID will be 5 characters long
    const charactersLength = 5;
    let id = '';

    for (let i = 0; i < charactersLength; i++) {
        id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return id;
};