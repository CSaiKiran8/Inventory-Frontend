import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate("/");

    return (
      <div className='m-5'>
        <div className='d-flex justify-content-center flex-column align-items-center'>
            <h1 className="m-2">Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button className='btn btn-primary' onClick={goBack}>Go Back</button>
            </div>
        </div>
        </div>
    )
}

export default Unauthorized