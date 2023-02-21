import './App.css';
import Weather from './components/Weather';
function App() {
    return (
        <div className="App">
            <div className="myName">
                <span id='img'><img src={require("./Assets/logo.png")} alt="" style={{height: 40, width: 40}} /></span>
                <span className="om"><b> -by Abhinav Sharma...</b></span>
            </div>
            <div className="box">
                <Weather />
            </div>
        </div>
    );
}

export default App;
