## Clean Architecture

### Folder Structure

Here's an example folder structure for a Node.js project using clean architecture:

```plaintext
src/
|-- useCases/
|   |-- postUseCase.js
|   |-- profanityFilterUseCase.js
|
|-- services/
|   |-- profanityFilterService.js
|
|-- adapters/
|   |-- expressAdapter.js
|
|-- config/
|   |-- passportConfig.js
|
|-- middleware/
|   |-- authenticateToken.js
|
|-- controllers/
|   |-- postController.js
|
|-- entities/
|   |-- Post.js
|
|-- repositories/
|   |-- userRepository.js
|
|-- app.js
|-- ...
```

### ProfanityFilterUseCase

In `useCases/profanityFilterUseCase.js`, define the high-level use case:

```javascript
// useCases/profanityFilterUseCase.js

class ProfanityFilterUseCase {
  filterProfanity(content) {
    // Implementation of profanity filtering logic
    throw new Error("Not implemented");
  }
}

module.exports = ProfanityFilterUseCase;
```

### ProfanityFilterService

In `services/profanityFilterService.js`, provide the concrete implementation of the profanity filtering logic:

```javascript
// services/profanityFilterService.js

class ProfanityFilterService {
  static filterProfanity(content) {
    // Implementation of profanity filtering logic
    // Example: Replace profane words with asterisks
    const filteredContent = content.replace(/badword/gi, "****");
    return filteredContent;
  }
}

module.exports = ProfanityFilterService;
```

### Profanity Filtering in Use Case

In `useCases/postUseCase.js`, utilize the profanity filtering service:

```javascript
// useCases/postUseCase.js

const ProfanityFilterService = require("../services/profanityFilterService");

class PostUseCase {
  createPost(postData) {
    // ... (other use case logic)

    // Filter profanity in post content
    const filteredContent = ProfanityFilterService.filterProfanity(
      postData.content
    );

    // ... (continue with other use case logic)
  }
}

module.exports = PostUseCase;
```

### Profanity Filtering in PostController

```javascript
class PostController {
  constructor(postInteractor, profanityFilterUseCase) {
    this.postInteractor = postInteractor;
    this.profanityFilterUseCase = profanityFilterUseCase;
  }

  async createPost(req, res) {
    try {
      const postData = req.body;

      // Filter profanity before saving
      postData.content = this.profanityFilterUseCase.filterProfanity(postData.content);
```

### Configure Dependency Injection

```javascript
const PostController = require("../controllers/PostController");
const ProfanityFilterService = require("../useCases/ProfanityFilterService");

class ExpressAdapter {
  constructor(postInteractor) {
    this.postInteractor = postInteractor;
    this.profanityFilterService = new ProfanityFilterService();
  }

  initConfigs(app) {
    // Inject ProfanityFilterService into PostController
    const postController = new PostController(
      this.postInteractor,
      this.profanityFilterService
    );

    app.post("/create-post", postController.createPost.bind(postController));
    // ... other routes
  }
}
```

By following these steps, you keep the profanity filtering logic separate from the controller and adhere to the clean architecture principles. The PostController depends on the abstract ProfanityFilterUseCase interface, and the concrete implementation (ProfanityFilterService) is injected at the configuration level.
