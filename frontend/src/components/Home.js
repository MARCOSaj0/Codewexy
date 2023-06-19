import { useEffect, useState } from "react";
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [coin, setCoin] = useState('');
    const [list, setList] = useState([]);

    useEffect(() => {
        // getData();
    }, [list]);

    const getData = async () => {
        const data = await axios.get('http://localhost:8000/api/getList');
        setList(data.data);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCoin(values => ({ ...values, [name]: value }))
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (coin.name && coin.price) {
            const data = await axios.post('http://localhost:8000/api/addCoin', coin);
            alert(data.data);
        }
        else {
            alert("Both fields are required");
        }
        setCoin('');
        getData();
    };

    return (
        <>
            <form onSubmit={onSubmit} className="form">
                <input
                    placeholder="Coin Name"
                    type="text"
                    name="name"
                    value={coin.name || ''}
                    onChange={handleChange}
                    className="input1"
                />
                <input
                    placeholder="Coin Price"
                    type="number"
                    name="price"
                    value={coin.price || ''}
                    onChange={handleChange}
                    className="input1"
                />
                <button type="Submit" className="button">Add Coin</button>
            </form>
            {(list.length > 0) ?
                (<div className="Table">
                    <table>
                        <thead>
                            <tr>
                                <th>Coin Name</th>
                                <th>Price</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list?.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{val.name}</td>
                                        <td>{val.price}</td>
                                        <td>{val.date}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>)
            : ''}
        </>
    )
}

export default Home;