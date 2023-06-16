import './styles.css';

function Footer() {
  return (
    <div className="footer">
      <div style={{ position: 'absolute', left: 40, display: 'flex', alignItems: 'center', gap: 20 }}>
        <img style={{ width: 100 }} src="/uom-logo.png"></img>
        <img style={{ width: 100 }} src="/cse-logo.png"></img>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <div>
          <img style={{ width: 250 }} src="/ChestXpert.png"></img>
        </div>
      </div>
      <div style={{ color: 'white', marginTop: 20 }}>
        A project by Department of Computer Science and Engineering <br /> University Of Moratuwa
      </div>
    </div>
  );
}

export default Footer;
