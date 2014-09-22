<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ja" xml:lang="ja" ><!-- InstanceBegin template="/Templates/index_temp.dwt" codeOutsideHTMLIsLocked="false" -->
<head>
        <meta http-equiv="content-type" content="text/html"/>
        <title>touchTalk - 触って話せるアプリ</title>
        <link rel="stylesheet" href="./css/index.css" />
        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css" />
        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
        <script type="text/javascript" src="./scripts/index.js"></script>
        <meta name="description" content="homepage" />
        <meta name="keywords" content="homepage" />
        <meta http-equiv="content-script-type" content="text/javascript" />
        <meta http-equiv="content-style-type" content="text/css" />
        <meta name="classification" content="homepage" />
        <meta name="copyright" content="syscom Co.,Ltd." />
        <meta name="author" content="homepage" />
        <meta name="msvalidate.01" content="E5765292B683ACFD002F28F8129B403A" />
        <meta name="viewport" content="width=device-width,initial-scale=1" /> 
	<script type='text/javascript' src='http://maps.google.com/maps/api/js?sensor=false'></script>
	</head>
<body>
        <div id="page" data-role="page" data-theme="e">
                <div id="header" data-role="header" data-theme="e">
                        <img src="icons/Untitled.png"/>
                </div>
                <div id="contents" data-role="contents">
                        <canvas id="stamp_canvas"></canvas>
                        <div id="pallete">
                                <div id="tab_selector_wrapper">
                                        <div class="tab_selector" id="action_tab_selector">
                                                <span class="tab_title">Action/行動</span>
                                        </div>
                                        <div class="tab_selector" id="place_tab_selector">
                                                <span class="tab_title">Place/場所</span>
                                        </div>
                                        <div class="tab_selector" id="vehicle_tab_selector">
                                                <span class="tab_title">Vehicle/乗物</span>
                                        </div>
                                </div>
                                <div id="icon_container">Others</div>
                        </div>
                </div>
        </div>
	<a href="#popupBasic" data-rel="popup">Open Popup</a>

	<div data-role="popup" id="popup_container">
		<p>This is a completely basic popup, no options set.</p>
	</div>
</body>
</html>
