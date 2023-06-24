from flask import Flask, render_template
import os

app = Flask(__name__)


# @app.route("/")
# def home():
#     return render_template('home.html')


@app.route('/model/<int:node_id>', methods=['POST'])
def handle_post_request(node_id):
    # Access the node_id from the URL and the request data
    # Perform necessary operations
    # Return a response

    # Example: Return a JSON response
    return {'node_id': node_id, 'message': 'POST request received'}



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)