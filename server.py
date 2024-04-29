import http.server
import socketserver

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

PORT = 8081
print('********************')
with socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
    print("Server started")
    print(f" run a brower on http://localhost:{PORT}/sketches")
    httpd.serve_forever()
