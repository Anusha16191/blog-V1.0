from flask import Flask, request, jsonify
from textblob import TextBlob
import json

app = Flask(__name__)


@app.route("/", methods=['POST'])
def sanitize():
    val = request.get_json()
    val = json.loads(val['body'])
    val = val['comment']

    commands = []

    commands.append(val)

    positive_commands = []
    negative_commands = []

    for command in commands:
        command_polarity = TextBlob(command).sentiment.polarity
        if command_polarity > 0:
            positive_commands.append(command)
            continue
        negative_commands.append(command)

    if [] != positive_commands:
        return(jsonify({"msg": 'Positive'}))

    if [] != negative_commands:
        return(jsonify({"msg": 'Negative'}))


if('__main__' == __name__):
    app.run(debug=True, port=7000)
