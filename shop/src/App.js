import './App.css';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import {useState} from 'react';
import data from './data'
// import 여러개하려면 import{변수1,변수2} from 경로;
function App(){
  let [shoes] = useState(data);

  return (
    <div>
      {/*<Button variant="primary">Primary</Button>*/}
      <Nav activeKey="/home" onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
        <Nav.Item>
          <Nav.Link href="/home">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="80%" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div>
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="80%" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div>
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="80%" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div>
        </div>
      </div>
    </div>

  )
}

// 리액트 이미지 사용 설명
// public 폴더에 있는 이미지 사용할 땐 <img src="/logo192.png" />
// 권장되는 방식 <img src={process.env.PUBLIC_URL + '/logo192.png'} />

// 왜냐면 리액트로 만든 html 페이지를 배포할 때 codingapple.com 경로에 배포하면 아무런 문제가 없지만
// codingapple.com/어쩌구/ 경로에 배포하면  /logo192.png 이렇게 쓰면 파일을 찾을 수 없다고 나올 수도 있습니다.
//   그래서 /어쩌구/ 를 뜻하는 process.env.PUBLIC_URL 이것도 더해주면 된다고 하는군요.
//   codingapple.com/어쩌구/ 경로에 리액트로 만든 페이지를 배포할 일이 아예 없으면 굳이 안해도 됩니다.

export default App;

