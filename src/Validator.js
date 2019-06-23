var checkColumnCount = (columncount, titlecolumn) => {
    if (columncount > 0 && columncount < titlecolumn.length)
        return true
    else
        return false
}

var checkFileExists = (file)=>{
    if(file){
        var valdata = file;
        var count = valdata.split(/\n/g);
        valdata= "";
        if(count.length>2)
            return true;
        else
            return false;
    }
}



module.exports = {
    checkColumnCount, checkFileExists
}