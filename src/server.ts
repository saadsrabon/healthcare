import app from './app';
import { envVars } from './app/config/config';

const port = envVars.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
