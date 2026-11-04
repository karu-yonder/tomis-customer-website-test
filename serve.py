#!/usr/bin/env python3
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        request_path = self.path.split("?", 1)[0]
        local_path = self.translate_path(request_path)
        if os.path.isdir(local_path):
            index = os.path.join(local_path, "index.html")
            if os.path.isfile(index):
                return SimpleHTTPRequestHandler.do_GET(self)
        if os.path.isfile(local_path):
            return SimpleHTTPRequestHandler.do_GET(self)
        self.path = "/index.html"
        return SimpleHTTPRequestHandler.do_GET(self)


if __name__ == "__main__":
    ThreadingHTTPServer(("127.0.0.1", 8765), Handler).serve_forever()
