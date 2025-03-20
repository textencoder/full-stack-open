sequenceDiagram
    participant browser
    participant server

    Note left of browser: User writes a new note and clicks "Save"

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    browser->>server: Content-Type: application/json
    browser->>server: { "content": "The new note content", "date": "current date" }
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the updated JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ..., { "content": "The new note content", "date": "current date" }]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the updated notes