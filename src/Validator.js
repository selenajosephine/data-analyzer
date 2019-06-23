var checkColumnCount = (columncount, titlecolumn) => {
    if (columncount > 0 && columncount < titlecolumn.length)
        return true
    else
        return false
}



module.exports = {
    checkColumnCount
}