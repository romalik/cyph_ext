var alphabet_lat = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var alphabet_cyr = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
var alphabet_signs = "0123456789`-=~!@#$%^&*()_+[]\\{}|;':\",./? "

var alphabet = alphabet_lat + alphabet_cyr + alphabet_signs;

var updateInterval = setInterval(processPage, 500);



function test() {
  console.log("test");
}


function get_idx(chr) {
  return alphabet.indexOf(chr);
}

function get_chr(idx) {
  return alphabet[idx];
}

function norm_idx(idx) {
  if(idx < 0) return alphabet.length + idx;
  else if(idx >= alphabet.length) return idx - alphabet.length;
  else return idx;
}

function cyph(a, b, direction) {
  var res = "",
      i = 0,
      j = 0;

  while (i<a.length) {
    let aVal = get_idx(a.charAt(i));
    let bVal = get_idx(b.charAt(j));
    let bChar = b.charAt(j);

    if(aVal >= 0) {
      let rVal = get_chr(norm_idx(direction?(aVal + bVal):(aVal - bVal)));
      
      res += rVal;
      console.log("aVal: " + aVal + " bVal (" + bChar + "): " + bVal + " rVal: " + rVal + " ascii rval: " + String.fromCharCode(rVal));
      j++;
    }
    i++;
    if(j == b.length) j = 0;
  }
  return res;
}

document.get


function processPage() {
  chrome.storage.sync.get("pass_value", ({ pass_value }) => {

      test();

      console.log(alphabet)
      console.log(alphabet.length)



      //injection test
      var matches = document.body.innerHTML.match(/s::(.*)::s/g);
      if(matches == null) return;

      console.log("matches:", matches)
      console.log("matches_length:", matches.length)

      var decrypt_dict = [];

      for(var i = 0; i<matches.length; i++) {
        let encrypted = matches[i].replace("s::","").replace("::s","");
        let decrypted = cyph(encrypted, pass_value, 0);


        decrypt_dict[matches[i]] = decrypted;
      }

      for (const [key, value] of Object.entries(decrypt_dict)) {
        console.log(key, value);

        let vv = value;
        document.body.innerHTML = document.body.innerHTML.replace(key,vv);
      }

  });
}
