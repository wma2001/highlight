function HighLighter(searchDom) {
	this.searchDom = searchDom;
	this.highList = []
	this.content = "";
	this.highIndex = -1
}

/**
 *
 * @param {*} content
 * @param {*} searchDom
 * @returns
 */
HighLighter.prototype.highlight = function (content, searchDom) {
	if (content.length == 0) {
		this.removeHigh();
		return;
	}
	if (searchDom) {
		this.searchDom = searchDom;
	}
	this.content = content
	this.colorWord(content, this.searchDom);
};

/**
 *
 * @param {*} content
 */
HighLighter.prototype.colorWord = function (content) {
	const selfHl = this
	$(this.searchDom).find("*").contents().each(function () {
		if (this.nodeType === 3) {
			var text = this.nodeValue;
			var regex = new RegExp(content, "gi");
			if (text.match(regex)) {
				var highlightedText = text.replace(regex, "<span class='highlight_text'>$&</span>");
				$(this).replaceWith(highlightedText);
			}
		}
	});
	$(this.searchDom).find('.highlight_text').each(function () {
		selfHl.highList.push($(this))
	})

	if (selfHl.highList.length > 0) {
		selfHl.ViewHigh()
	}
};

HighLighter.prototype.removeHigh = function () {
	this.highList = []
	this.content = null
	this.highIndex = -1
	$(".highlight_text").replaceWith(function () {
		return $(this).contents();
	});
};

HighLighter.prototype.ViewHigh = function () {
	// 监听按键或行为 执行scrollHigh

	// 
	this.scrollHigh()
}

HighLighter.prototype.scrollHigh = function () {
	this.highIndex = ++this.highIndex % this.highList.length
	const curDom = this.highList[this.highIndex]
	$('html, body').animate({
		scrollTop: curDom.offset().top - 200
	}, 500);

}

$(document).ready(function () {
	const dom = "#search_dom"
	const hl = new HighLighter(dom);
	$("#search_btn").on("click", function () {
		hl.removeHigh();
		const val = $("#search_ipt").val();
		hl.highlight(val);
	});
})