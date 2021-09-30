/*url = "https://api.live.bilibili.com/xlive/web-interface/v1/second/getList?platform=web&parent_area_id=9&area_id=0&sort_type=sort_type_291&page=1"

$.get(url,function(data)
    {
        console.log(data.text); 
    }
);
*/
var vtbList;
var index = 0;
var count = 0;

function init()
{
    index = 0;
    count = 0;
}

function getPageList(page)
{
    json = {};
    url = "https://api.live.bilibili.com/xlive/web-interface/v1/second/getList?platform=web&parent_area_id=9&area_id=0&sort_type=sort_type_291&page="+page;
    $.get(url, function(data)
    {
        json = JSON.parse(data);
    });
    return json["data"]["list"];
}

function getFullList()
{
    var list = []
    var i = 1;
    for(;;)
    {
        page = getPageList(i);
        if(page.isEmpty())
        {
            break;
        }
        list = list.concat(page);
    }
    return list;
}

function loadVtb()
{
    vtb = vtbList[index];
    $("#room-title").text(vtb["title"]);
    $("#room-name").text(vtb["uname"]);
    $("#pic1").attr("src", vtb["cover"]);
    $("#pic2").attr("src", vtb["system_cover"]);
    $("#total-count").text((index+1)+"/"+vtbList.length);
    $("#bar1").css("width", (index+1)/vtbList.length*100+"%");
    $("#go-room").attr("href", "https://live.bilibili.com/"+vtb["roomid"]);
}

$(function()
{
    init();
});

$("#load").click(function()
{
    vtbList = getFullList();
    console.log(vtbList);
    init();
    loadVtb();
});

$("#btn-skip").click(function()
{
    if(index<vtbList.length)
    {
        index++;
        loadVtb();
    }
})

$("#btn-count").click(function()
{
    if(index<vtbList.length)
    {
        index++;
        loadVtb();
        count++;
        $("#digit-count").text(count);
    }
})