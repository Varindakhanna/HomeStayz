import AccountNav from "../AccountNav";
import PlacesFormPage from "./PlacesFormPage";
import { useParams , Link} from "react-router-dom";

export default function PlacesPage() {
  const { action } = useParams();
  // function linkClasses(type = null) {
  //   let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
  //   if (type === false) {
  //     classes += " bg-primary text-white ";
  //   }
  //   else{
  //       classes += " bg-gray-200 ";
  //   }
  //   return classes;
  // }
 
  // const [redirect,setRedirect]=useState(" ");
  // function handleCbClick(ev) {
  //   const { checked, name } = ev.target;
  //   if (checked) {
  //     onChange([...selected, name]);
  //   } else {
  //     onChange([...selected.filter((selectedName) => selectedName !== name)]);
  //   }
  // }
  // async function addPhotoByLink(ev) {
  //   ev.preventDefault();
  //   const {data:filename} =await axios.post('/upload-by-link', { link: photoLink });
  //   setAddedPhotos(prev =>{
  //       return [...prev,filename];
  //   });

  //   setPhotoLink('');
  // }

  
  return (
    <div>
      <AccountNav/>
      
        <div className="text-center">
          List of all added places
          <br/>
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Add new place
          </Link>
        </div>
      

      {/* {action === "new" && (
        <PlacesFormPage/>       
      )} */}

    </div>
  );
}