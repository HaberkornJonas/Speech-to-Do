from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from infrastructure.LanguageProcessing import LanguageProcessing
import json

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Init classes
languageProcessor = LanguageProcessing()


@app.route('/')
@cross_origin()
def home():
    return "<h2> Welcome 😃 this is the Home page of the Speech-to-Do api ✅</h2> " \
           "<br>" \
           "You should try to send a POST request to that endpoint:<br>" \
           "👉 <strong>/api/v1/getTodoList</strong> <br>" \
           "with a body like this: <br>" \
           "📑 <strong>{\"text\": \"Pflanzen gießen stop Fenster schließen stop Licht ausschalten stop Türen schließen\", \"breakword\": \"stop\", \"checkConcatenate\": true}</strong>"


@app.route('/api/v1/getTodoList', methods=["POST"])
@cross_origin()
def userPostRequest():

    body = request.get_json(force=True)
    print(body)

    res = languageProcessor.analyseRequest(body['text'], body['breakword'], body['checkConcatenate'])

    return jsonify(res)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
