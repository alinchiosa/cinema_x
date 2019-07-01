import pickle
import os
import re
import pandas as pd
from sklearn.feature_extraction.text import HashingVectorizer


from sklearn.feature_extraction.text import HashingVectorizer
from sklearn.linear_model import SGDClassifier

from nltk.corpus import stopwords
stop = stopwords.words('english')

# load the data
df = pd.read_csv('./data/movie_data.csv', encoding='utf-8')

df.head(3)

def tokenizer(text):
    text = re.sub('<[^>]*>', '', text)
    emoticons = re.findall('(?::|;|=)(?:-)?(?:\)|\(|D|P)',
                           text.lower())
    text = re.sub('[\W]+', ' ', text.lower()) \
                   + ' '.join(emoticons).replace('-', '')
    tokenized = [w for w in text.split() if w not in stop]
    return tokenized

vect = HashingVectorizer(decode_error='ignore',
                         n_features=2**21,
                         preprocessor=None,
                         tokenizer=tokenizer)

 # train model by Stochastic Gradient Descent classifier
classifier = SGDClassifier(loss='log', random_state=1, max_iter=1)
X_train = df['review'].values
y_train = df['sentiment'].values

X_train = vect.transform(X_train)
classifier.fit(X_train, y_train)


#EXPORT THE MODEL
# create dir and subdir for pickled objects (export of the built model)
dest = os.path.join('model', 'pickles')
if not os.path.exists(dest):
    os.makedirs(dest)

# serialize the model
pickle.dump(stop, open(os.path.join(dest, 'stopwords.pkl'), 'wb'), protocol=4)
pickle.dump(classifier, open(os.path.join(dest, 'classifier.pkl'), 'wb'), protocol=4)