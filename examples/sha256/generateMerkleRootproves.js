
// PROOF OF MERKLEROOTHASH OF A TREE WITH HEIGHT: HEIGHT BY HASHING ALL LEAVES
// ACTUAL CHECKING LOGIK IS STILL COMMENTED OUT


let height=3;
let leaves = 2**height
let code = ""
code = code +"import \".\/sha256.code\" as SHA256COMPRESS \n\n"

code = code +"def main( i,"
for(h=0;h<leaves;h++){
	for(i=0;i<256;i++){
	if(i==255 && h==leaves-1)
		code = code +"private h0w"+(i+256*h)+""
	else
		code = code +"private h0w"+(i+256*h)+","

		
	}
}
code = code +"): \n"




for(s=1;s<=height;s++){
	for(t=1;t<=leaves/2**s;t++){
		for(i=0;i<256;i++){
		if(i==255)
			code = code +"h"+s+"w"+(i+256*(t-1))+" "
		else 
			code = code +"h"+s+"w"+(i+256*(t-1))+","	
		}
		code = code +"= SHA256COMPRESS("
		for(i=0;i<256*2;i++){
		if(i==255*2+1)
			code = code +"h"+(s-1)+"w"+(i+(t-1)*512)+" "
		else 
			code = code +"h"+(s-1)+"w"+(i+(t-1)*512)+","
		}
		code = code +") \n \n"
	}
}


// for(i=0;i<256;i++){
// 	code = code + (i-(i/2)*2)+" == h"+height+"w"+i+" \n"
// 	code = code + "i = i / 2 \n"
// 	break;
// }

code = code + "return 1"

console.log(code)


var fs = require('fs');
fs.writeFile("./examples/sha256/Merkleroot.code", code, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

let input = "#!/bin/bash \n \
./target/release/zokrates compile -i 'examples/sha256/Merkleroot.code' \n \
./target/release/zokrates compute-witness -a "
 input = input + "13426246346546 "
for( i=0;i<(leaves)*256;i++){
	input = input + Math.floor(Math.random() * 2) + " ";
}

input = input + "\n time ./target/release/zokrates setup \n"
input = input + "time ./target/release/zokrates generate-proof \n"
 
fs.writeFile("measureProofgenerationTime.sh", input, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
console.log(input)
