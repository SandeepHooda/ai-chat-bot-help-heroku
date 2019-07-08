
import textwrap
from pprint import pprint
import nltk.data # $ pip install http://www.nltk.org/nltk3-alpha/nltk-3.0a3.tar.gz
# python -c "import nltk; nltk.download('punkt')"

sent_tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
text = input('Enter a sentence/sentences please:')
print("\n" + textwrap.fill(text))
sentences = sent_tokenizer.tokenize(text)
sentences = [sent.capitalize() for sent in sentences]
pprint(sentences)