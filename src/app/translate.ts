type Result = {
  translations: [
    {
      detected_source_language: string;
      text: string;
    }
  ];
};

export const translate = async (selectedText: string, userTargetLang: string) => {
  const API_URL =
    'https://script.google.com/macros/s/AKfycbxjBAU7asCz3rpKiw2WyRI8oaxCIUjoz_jNwV8if0kAOkEjEhj7rQp8YGdY8OcUdHGU/exec';
  const params = {
    text: selectedText,
    target_lang: userTargetLang,
  };
  const query = new URLSearchParams(params);
  const url = API_URL + '?' + query;

  const res = await fetch(url, {
    method: 'GET',
    mode: 'cors',
  });
  const json: Result = await res.json();
  return json.translations[0].text;
};
