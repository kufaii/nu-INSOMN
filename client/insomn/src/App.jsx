import { RouterProvider } from "react-router-dom";
import router from "./router";
import FetchCategoryContext from "./contexts/FetchCategory";
import CategoryProvider from "./contexts/FetchCategory";

function App() {


  return(
    <>
    <CategoryProvider>
          <RouterProvider router={router} />;
    </CategoryProvider>
    </>

  ) 
}

export default App;
