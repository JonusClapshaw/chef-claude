import chef from '../assets/chef.jpg'

export default function Header() {
    return (
        <header> 
            <img src={chef} alt='chef-hat'></img>
            <h1>Chef Claude</h1>
        </header>
    )
};
