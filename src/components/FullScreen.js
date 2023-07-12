import { Button } from "react-bootstrap";

export function openFullscreen(setFullScreen) {
  let elem = document.documentElement;

  setFullScreen(true);
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

export function closeFullscreen(setFullScrenn) {
  setFullScrenn(false);
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

export function btnFullScreen() {
  const fullscreen =()=> {
    let elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  fullscreen()
  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Enter") {
        fullscreen();
      }
    },
    false
  );
  
  // return (
  //   <div style={{ marginTop: -6 }}>
  //     <Button style={{ marginRight: 2, padding:1 }} variant="outline-primary" onClick={()=> fullscreen()}>
  //       Full screen
  //     </Button>
  //     <Button style={{ padding:1 }} variant="outline-danger" onClick={()=> closeFullscreen()}>Exit full screen</Button>
  //   </div>
  // );
}
