import axios from 'axios'

export const api = new axios({
    method: 'GET',
    url: 'https://languagetools.p.rapidapi.com/synonyms/dog',
    headers: {
        'X-RapidAPI-Key': 'eb913b61c4mshd2b44c5b7a67aebp13691ajsn7354822b662d',
        'X-RapidAPI-Host': 'languagetools.p.rapidapi.com'
    }
})

try {
    const response = await axios.request(api);
    console.log(response.data);
} catch (error) {
    console.error(error);
}