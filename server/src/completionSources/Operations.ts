import { CompletionItem } from "vscode-languageserver";
import { loadCommandHelp } from "./LoadCompletionSources";
export let operationList: CompletionItem[] = []

loadCommandHelp();


//    {label: "Abort", kind: 3},							
//    {label: "AddFIFOData", kind: 3},						
//    {label: "AddFIFOVectData", kind: 3},					
//    {label: "AddMovieAudio", kind: 3},					
//    {label: "AddMovieFrame", kind: 3},					
//    {label: "AddWavesToBoxPlot", kind: 3},				
//    {label: "AddWavesToViolinPlot", kind: 3},			
//    {label: "AdoptFiles", kind: 3},						
//    {label: "APMath", kind: 3},							
//    {label: "Append", kind: 3},							
//    {label: "AppendBoxPlot", kind: 3},					
//    {label: "AppendImage", kind: 3},						
//    {label: "AppendLayoutObject", kind: 3},				
//    {label: "AppendMatrixContour", kind: 3},				
//    {label: "AppendText", kind: 3},						
//    {label: "AppendToGizmo", kind: 3},					
//    {label: "AppendToGraph", kind: 3},					
//    {label: "AppendToLayout", kind: 3},					
//    {label: "AppendToTable", kind: 3},					
//    {label: "AppendViolinPlot", kind: 3},				
//    {label: "AppendXYZContour", kind: 3},				
//    {label: "AutoPositionWindow", kind: 3},				
//    {label: "BackgroundInfo", kind: 3},					
//    {label: "Beep", kind: 3},							
//    {label: "BezierToPolygon", kind: 3},					
//    {label: "BombOut", kind: 3},							
//    {label: "BoundingBall", kind: 3},					
//    {label: "BoxSmooth", kind: 3},						
//    {label: "BrowseURL", kind: 3},						
//    {label: "BuildMenu", kind: 3},						
//    {label: "Button", kind: 3},							
//    {label: "cd", kind: 3},								
//    {label: "Chart", kind: 3},							
//    {label: "CheckBox", kind: 3},						
//    {label: "CheckDisplayed", kind: 3},					
//    {label: "ChooseColor", kind: 3},						
//    {label: "Close", kind: 3},							
//    {label: "CloseHelp", kind: 3},						
//    {label: "CloseMovie", kind: 3},						
//    {label: "CloseProc", kind: 3},						
//    {label: "ColorScale", kind: 3},						
//    {label: "ColorTab2Wave", kind: 3},					
//    {label: "Concatenate", kind: 3},						
//    {label: "ControlBar", kind: 3},						
//    {label: "ControlInfo", kind: 3},						
//    {label: "ControlUpdate", kind: 3},					
//    {label: "ConvertGlobalStringTextEncoding", kind: 3},	
//    {label: "ConvexHull", kind: 3},						
//    {label: "Convolve", kind: 3},						
//    {label: "CopyDimLabels", kind: 3},					
//    {label: "CopyFile", kind: 3},						
//    {label: "CopyFolder", kind: 3},						
//    {label: "CopyScales", kind: 3},						
//    {label: "Correlate", kind: 3},						
//    {label: "CreateAliasShortcut", kind: 3},				
//    {label: "CreateBrowser", kind: 3},					
//    {label: "Cross", kind: 3},							
//    {label: "CtrlBackground", kind: 3},					
//    {label: "CtrlFIFO", kind: 3},						
//    {label: "CtrlNamedBackground", kind: 3},				
//    {label: "Cursor", kind: 3},							
//    {label: "CurveFit", kind: 3},						
//    {label: "CustomControl", kind: 3},					
//    {label: "CWT", kind: 3},								
//    {label: "debug", kind: 3},							
//    {label: "Debugger", kind: 3},						
//    {label: "DebuggerOptions", kind: 3},					
//    {label: "DefaultFont", kind: 3},						
//    {label: "DefaultGuiControls", kind: 3},				
//    {label: "DefaultGuiFont", kind: 3},					
//    {label: "DefaultTextEncoding", kind: 3},				
//    {label: "DefineGuide", kind: 3},						
//    {label: "DelayUpdate", kind: 3},						
//    {label: "DeleteAnnotations", kind: 3},				
//    {label: "DeleteFile", kind: 3},						
//    {label: "DeleteFolder", kind: 3},					
//    {label: "DeletePoints", kind: 3},					
//    {label: "Differentiate", kind: 3},					
//    {label: "dir", kind: 3},								
//    {label: "Display", kind: 3},							
//    {label: "DisplayHelpTopic", kind: 3},				
//    {label: "DisplayProcedure", kind: 3},				
//    {label: "DoAlert", kind: 3},							
//    {label: "DoIgorMenu", kind: 3},						
//    {label: "DoUpdate", kind: 3},						
//    {label: "DoWindow", kind: 3},						
//    {label: "DoXOPIdle", kind: 3},						
//    {label: "DPSS", kind: 3},							
//    {label: "DrawAction", kind: 3},						
//    {label: "DrawArc", kind: 3},							
//    {label: "DrawBezier", kind: 3},						
//    {label: "DrawLine", kind: 3},						
//    {label: "DrawOval", kind: 3},						
//    {label: "DrawPICT", kind: 3},						
//    {label: "DrawPoly", kind: 3},						
//    {label: "DrawRect", kind: 3},						
//    {label: "DrawRRect", kind: 3},						
//    {label: "DrawText", kind: 3},						
//    {label: "DrawUserShape", kind: 3},					
//    {label: "DSPDetrend", kind: 3},						
//    {label: "DSPPeriodogram", kind: 3},					
//    {label: "Duplicate", kind: 3},						
//    {label: "DuplicateDataFolder", kind: 3},				
//    {label: "DWT", kind: 3},								
//    {label: "EdgeStats", kind: 3},						
//    {label: "Edit", kind: 3},							
//    {label: "EncryptProcedureFiles", kind: 3},			
//    {label: "ErrorBars", kind: 3},						
//    {label: "EstimatePeakSizes", kind: 3},				
//    {label: "Execute", kind: 3},							
//    {label: "ExecuteScriptText", kind: 3},				
//    {label: "ExperimentInfo", kind: 3},					
//    {label: "ExperimentModified", kind: 3},				
//    {label: "ExportGizmo", kind: 3},						
//    {label: "Extract", kind: 3},							
//    {label: "FastGaussTransform", kind: 3},				
//    {label: "FastOp", kind: 3},							
//    {label: "FBinRead", kind: 3},						
//    {label: "FBinWrite", kind: 3},						
//    {label: "FFT", kind: 3},								
//    {label: "FGetPos", kind: 3},							
//    {label: "FIFO2Wave", kind: 3},						
//    {label: "FIFOStatus", kind: 3},						
//    {label: "FilterFIR", kind: 3},						
//    {label: "FilterIIR", kind: 3},						
//    {label: "FindAPeak", kind: 3},						
//    {label: "FindContour", kind: 3},						
//    {label: "FindDuplicates", kind: 3},					
//    {label: "FindLevel", kind: 3},						
//    {label: "FindLevels", kind: 3},						
//    {label: "FindPeak", kind: 3},						
//    {label: "FindPointsInPoly", kind: 3},				
//    {label: "FindRoots", kind: 3},						
//    {label: "FindSequence", kind: 3},					
//    {label: "FindValue", kind: 3},						
//    {label: "FMaxFlat", kind: 3},						
//    {label: "FPClustering", kind: 3},					
//    {label: "fprintf", kind: 3},							
//    {label: "FPU", kind: 3},								
//    {label: "FReadLine", kind: 3},						
//    {label: "FSetPos", kind: 3},							
//    {label: "FStatus", kind: 3},							
//    {label: "FTPCreateDirectory", kind: 3},				
//    {label: "FTPDelete", kind: 3},						
//    {label: "FTPDownload", kind: 3},						
//    {label: "FTPUpload", kind: 3},						
//    {label: "FuncFit", kind: 3},							
//    {label: "FuncFitMD", kind: 3},						
//    {label: "GBLoadWave", kind: 3},						
//    {label: "GetAxis", kind: 3},							
//    {label: "GetCamera", kind: 3},						
//    {label: "GetFileFolderInfo", kind: 3},				
//    {label: "GetGizmo", kind: 3},						
//    {label: "GetLastUserMenuInfo", kind: 3},				
//    {label: "GetMarquee", kind: 3},						
//    {label: "GetMouse", kind: 3},						
//    {label: "GetSelection", kind: 3},					
//    {label: "GetWindow", kind: 3},						
//    {label: "GraphNormal", kind: 3},						
//    {label: "GraphWaveDraw", kind: 3},					
//    {label: "GraphWaveEdit", kind: 3},					
//    {label: "Grep", kind: 3},							
//    {label: "GroupBox", kind: 3},						
//    {label: "Hanning", kind: 3},							
//    {label: "HCluster", kind: 3},						
//    {label: "HDF5CloseFile", kind: 3},					
//    {label: "HDF5CloseGroup", kind: 3},					
//    {label: "HDF5Control", kind: 3},						
//    {label: "HDF5ConvertColors", kind: 3},				
//    {label: "HDF5CreateFile", kind: 3},					
//    {label: "HDF5CreateGroup", kind: 3},					
//    {label: "HDF5CreateLink", kind: 3},					
//    {label: "HDF5DimensionScale", kind: 3},				
//    {label: "HDF5Dump", kind: 3},						
//    {label: "HDF5DumpErrors", kind: 3},					
//    {label: "HDF5DumpState", kind: 3},					
//    {label: "HDF5FlushFile", kind: 3},					
//    {label: "HDF5ListAttributes", kind: 3},				
//    {label: "HDF5ListGroup", kind: 3},					
//    {label: "HDF5LoadData", kind: 3},					
//    {label: "HDF5LoadGroup", kind: 3},					
//    {label: "HDF5LoadImage", kind: 3},					
//    {label: "HDF5OpenFile", kind: 3},					
//    {label: "HDF5OpenGroup", kind: 3},					
//    {label: "HDF5SaveData", kind: 3},					
//    {label: "HDF5SaveGroup", kind: 3},					
//    {label: "HDF5SaveImage", kind: 3},					
//    {label: "HDF5UnlinkObject", kind: 3},				
//    {label: "HideIgorMenus", kind: 3},					
//    {label: "HideInfo", kind: 3},						
//    {label: "HideProcedures", kind: 3},					
//    {label: "HideTools", kind: 3},						
//    {label: "HilbertTransform", kind: 3},				
//    {label: "Histogram", kind: 3},						
//    {label: "ICA", kind: 3},								
//    {label: "IFFT", kind: 3},							
//    {label: "ImageAnalyzeParticles", kind: 3}, 			
//    {label: "ImageBlend", kind: 3},						
//    {label: "ImageBoundaryToMask", kind: 3},				
//    {label: "ImageComposite", kind: 3},					
//    {label: "ImageEdgeDetection", kind: 3},				
//    {label: "ImageFileInfo", kind: 3},					
//    {label: "ImageFilter", kind: 3},						
//    {label: "ImageFocus", kind: 3},						
//    {label: "ImageFromXYZ", kind: 3},					
//    {label: "ImageGenerateROIMask", kind: 3},			
//    {label: "ImageGLCM", kind: 3},						
//    {label: "ImageHistModification", kind: 3},			
//    {label: "ImageHistogram", kind: 3},					
//    {label: "ImageInterpolate", kind: 3},				
//    {label: "ImageLineProfile", kind: 3},				
//    {label: "ImageLoad", kind: 3},						
//    {label: "ImageMorphology", kind: 3},					
//    {label: "ImageRegistration", kind: 3},				
//    {label: "ImageRemoveBackground", kind: 3},			
//    {label: "ImageRestore", kind: 3},					
//    {label: "ImageRotate", kind: 3},						
//    {label: "ImageSave", kind: 3},						
//    {label: "ImageSeedFill", kind: 3},					
//    {label: "ImageSkeleton3d", kind: 3},					
//    {label: "ImageSnake", kind: 3},						
//    {label: "ImageStats", kind: 3},						
//    {label: "ImageThreshold", kind: 3},					
//    {label: "ImageTransform", kind: 3},					
//    {label: "ImageUnwrapPhase", kind: 3},				
//    {label: "ImageWindow", kind: 3},						
//    {label: "IndexSort", kind: 3},						
//    {label: "InsertPoints", kind: 3},					
//    {label: "InstantFrequency", kind: 3},				
//    {label: "Integrate", kind: 3},						
//    {label: "Integrate2D", kind: 3},						
//    {label: "IntegrateODE", kind: 3},					
//    {label: "Interp3DPath", kind: 3},					
//    {label: "Interp4DPath", kind: 3},					
//    {label: "Interpolate2", kind: 3},					
//    {label: "Interpolate3D", kind: 3},					
//    {label: "JCAMPLoadWave", kind: 3},					
//    {label: "JointHistogram", kind: 3},					
//    {label: "JSONSimple", kind: 3},						
//    {label: "KillBackground", kind: 3},					
//    {label: "KillControl", kind: 3},						
//    {label: "KillDataFolder", kind: 3},					
//    {label: "KillFIFO", kind: 3},						
//    {label: "KillFreeAxis", kind: 3},					
//    {label: "KillPath", kind: 3},						
//    {label: "KillPICTs", kind: 3},						
//    {label: "KillStrings", kind: 3},						
//    {label: "KillVariables", kind: 3},					
//    {label: "KillWaves", kind: 3},						
//    {label: "KillWindow", kind: 3},						
//    {label: "KillXOP", kind: 3},							
//    {label: "KMeans", kind: 3},							
//    {label: "Label", kind: 3},							
//    {label: "Layout", kind: 3},							
//    {label: "LayoutPageAction", kind: 3},				
//    {label: "LayoutSlideShow", kind: 3},					
//    {label: "Legend", kind: 3},							
//    {label: "LHNullOperation", kind: 3},					
//    {label: "LinearFeedbackShiftRegister", kind: 3},		
//    {label: "ListBox", kind: 3},							
//    {label: "ListPICTs", kind: 3},						
//    {label: "ListPRecs", kind: 3},						
//    {label: "LoadData", kind: 3},						
//    {label: "LoadExps", kind: 3},						
//    {label: "LoadPackagePreferences", kind: 3},			
//    {label: "LoadPICT", kind: 3},						
//    {label: "LoadWave", kind: 3},						
//    {label: "LoadXOP", kind: 3},							
//    {label: "Loess", kind: 3},							
//    {label: "LombPeriodogram", kind: 3},					
//    {label: "Make", kind: 3},							
//    {label: "MakeIndex", kind: 3},						
//    {label: "MarkPerfTestTime", kind: 3},				
//    {label: "MatrixBalance", kind: 3},					
//    {label: "MatrixConvolve", kind: 3},					
//    {label: "MatrixCorr", kind: 3},						
//    {label: "MatrixEigenV", kind: 3},					
//    {label: "MatrixFactor", kind: 3},					
//    {label: "MatrixFilter", kind: 3},					
//    {label: "MatrixGaussJ", kind: 3},					
//    {label: "MatrixGLM", kind: 3},						
//    {label: "MatrixInverse", kind: 3},					
//    {label: "MatrixLinearSolve", kind: 3},				
//    {label: "MatrixLinearSolveTD", kind: 3},				
//    {label: "MatrixLLS", kind: 3},						
//    {label: "MatrixLUBkSub", kind: 3},					
//    {label: "MatrixLUD", kind: 3},						
//    {label: "MatrixLUDTD", kind: 3},						
//    {label: "MatrixMultiply", kind: 3},					
//    {label: "MatrixMultiplyAdd", kind: 3},				
//    {label: "MatrixOP", kind: 3},						
//    {label: "MatrixReverseBalance", kind: 3},			
//    {label: "MatrixSchur", kind: 3},						
//    {label: "MatrixSolve", kind: 3},						
//    {label: "MatrixSparse", kind: 3},					
//    {label: "MatrixSVBkSub", kind: 3},					
//    {label: "MatrixSVD", kind: 3},						
//    {label: "MatrixTranspose", kind: 3},					
//    {label: "MeasureStyledText", kind: 3},				
//    {label: "MLLoadWave", kind: 3},						
//    {label: "Modify", kind: 3},							
//    {label: "ModifyBoxPlot", kind: 3},					
//    {label: "ModifyBrowser", kind: 3},					
//    {label: "ModifyCamera", kind: 3},					
//    {label: "ModifyContour", kind: 3},					
//    {label: "ModifyControl", kind: 3},					
//    {label: "ModifyControlList", kind: 3},				
//    {label: "ModifyFreeAxis", kind: 3},					
//    {label: "ModifyGizmo", kind: 3},						
//    {label: "ModifyGraph", kind: 3},						
//    {label: "ModifyImage", kind: 3},						
//    {label: "ModifyLayout", kind: 3},					
//    {label: "ModifyPanel", kind: 3},						
//    {label: "ModifyProcedure", kind: 3},					
//    {label: "ModifyTable", kind: 3},						
//    {label: "ModifyViolinPlot", kind: 3},				
//    {label: "ModifyWaterfall", kind: 3},					
//    {label: "MoveDataFolder", kind: 3},					
//    {label: "MoveFile", kind: 3},						
//    {label: "MoveFolder", kind: 3},						
//    {label: "MoveString", kind: 3},						
//    {label: "MoveSubwindow", kind: 3},					
//    {label: "MoveVariable", kind: 3},					
//    {label: "MoveWave", kind: 3},						
//    {label: "MoveWindow", kind: 3},						
//    {label: "MultiTaperPSD", kind: 3},					
//    {label: "MultiThreadingControl", kind: 3},			
//    {label: "NeuralNetworkRun", kind: 3},				
//    {label: "NeuralNetworkTrain", kind: 3},				
//    {label: "NewCamera", kind: 3},						
//    {label: "NewDataFolder", kind: 3},					
//    {label: "NewFIFO", kind: 3},							
//    {label: "NewFIFOChan", kind: 3},						
//    {label: "NewFreeAxis", kind: 3},						
//    {label: "NewGizmo", kind: 3},						
//    {label: "NewImage", kind: 3},						
//    {label: "NewLayout", kind: 3},						
//    {label: "NewMovie", kind: 3},						
//    {label: "NewNotebook", kind: 3},						
//    {label: "NewPanel", kind: 3},						
//    {label: "NewPath", kind: 3},							
//    {label: "NewWaterfall", kind: 3},					
//    {label: "Note", kind: 3},							
//    {label: "Notebook", kind: 3},						
//    {label: "NotebookAction", kind: 3},					
//    {label: "Open", kind: 3},							
//    {label: "OpenHelp", kind: 3},						
//    {label: "OpenNotebook", kind: 3},					
//    {label: "OpenProc", kind: 3},						
//    {label: "Optimize", kind: 3},						
//    {label: "ParseOperationTemplate", kind: 3},			
//    {label: "PathInfo", kind: 3},						
//    {label: "PauseForUser", kind: 3},					
//    {label: "PauseUpdate", kind: 3},						
//    {label: "PCA", kind: 3},								
//    {label: "PlayMovie", kind: 3},						
//    {label: "PlayMovieAction", kind: 3},					
//    {label: "PlaySound", kind: 3},						
//    {label: "PolygonOp", kind: 3},						
//    {label: "PopupContextualMenu", kind: 3},				
//    {label: "PopupMenu", kind: 3},						
//    {label: "Preferences", kind: 3},						
//    {label: "PrimeFactors", kind: 3},					
//    {label: "Print", kind: 3},							
//    {label: "printf", kind: 3},							
//    {label: "PrintGraphs", kind: 3},						
//    {label: "PrintLayout", kind: 3},						
//    {label: "PrintNotebook", kind: 3},					
//    {label: "PrintSettings", kind: 3},					
//    {label: "PrintTable", kind: 3},						
//    {label: "Project", kind: 3},							
//    {label: "PulseStats", kind: 3},						
//    {label: "PutScrapText", kind: 3},					
//    {label: "pwd", kind: 3},								
//    {label: "Python", kind: 3},							
//    {label: "PythonFile", kind: 3},						
//    {label: "Quit", kind: 3},							
//    {label: "RatioFromNumber", kind: 3},					
//    {label: "ReadVariables", kind: 3},					
//    {label: "Redimension", kind: 3},						
//    {label: "Remez", kind: 3},							
//    {label: "Remove", kind: 3},							
//    {label: "RemoveContour", kind: 3},					
//    {label: "RemoveFromGizmo", kind: 3},					
//    {label: "RemoveFromGraph", kind: 3},					
//    {label: "RemoveFromLayout", kind: 3},				
//    {label: "RemoveFromTable", kind: 3},					
//    {label: "RemoveImage", kind: 3},						
//    {label: "RemoveLayoutObjects", kind: 3},				
//    {label: "RemovePath", kind: 3},						
//    {label: "Rename", kind: 3},							
//    {label: "RenameDataFolder", kind: 3},				
//    {label: "RenamePath", kind: 3},						
//    {label: "RenamePICT", kind: 3},						
//    {label: "RenameWindow", kind: 3},					
//    {label: "ReorderImages", kind: 3},					
//    {label: "ReorderTraces", kind: 3},					
//    {label: "ReplaceText", kind: 3},						
//    {label: "ReplaceWave", kind: 3},						
//    {label: "Resample", kind: 3},						
//    {label: "ResumeUpdate", kind: 3},					
//    {label: "Reverse", kind: 3},							
//    {label: "Rotate", kind: 3},							
//    {label: "Save", kind: 3},							
//    {label: "SaveData", kind: 3},						
//    {label: "SaveExperiment", kind: 3},					
//    {label: "SaveGizmoCopy", kind: 3},					
//    {label: "SaveGraphCopy", kind: 3},					
//    {label: "SaveNotebook", kind: 3},					
//    {label: "SavePackagePreferences", kind: 3},			
//    {label: "SavePICT", kind: 3},						
//    {label: "SaveTableCopy", kind: 3},					
//    {label: "SetActiveSubwindow", kind: 3},				
//    {label: "SetAxis", kind: 3},							
//    {label: "SetBackground", kind: 3},					
//    {label: "SetDashPattern", kind: 3},					
//    {label: "SetDataFolder", kind: 3},					
//    {label: "SetDimLabel", kind: 3},						
//    {label: "SetDrawEnv", kind: 3},						
//    {label: "SetDrawLayer", kind: 3},					
//    {label: "SetFileFolderInfo", kind: 3},				
//    {label: "SetFormula", kind: 3},						
//    {label: "SetIdlePeriod", kind: 3},					
//    {label: "SetIgorHook", kind: 3},						
//    {label: "SetIgorMenuMode", kind: 3},					
//    {label: "SetIgorOption", kind: 3},					
//    {label: "SetIgorProcess", kind: 3},					
//    {label: "SetMarquee", kind: 3},						
//    {label: "SetProcessSleep", kind: 3},					
//    {label: "SetRandomSeed", kind: 3},					
//    {label: "SetScale", kind: 3},						
//    {label: "SetVariable", kind: 3},						
//    {label: "SetWaveLock", kind: 3},						
//    {label: "SetWaveTextEncoding", kind: 3},				
//    {label: "SetWindow", kind: 3},						
//    {label: "ShowDependency", kind: 3},					
//    {label: "ShowIgorMenus", kind: 3},					
//    {label: "ShowInfo", kind: 3},						
//    {label: "ShowTools", kind: 3},						
//    {label: "Silent", kind: 3},							
//    {label: "Sleep", kind: 3},							
//    {label: "Slider", kind: 3},							
//    {label: "Slow", kind: 3},							
//    {label: "Smooth", kind: 3},							
//    {label: "SmoothCustom", kind: 3},					
//    {label: "Sort", kind: 3},							
//    {label: "SortColumns", kind: 3},						
//    {label: "SoundInRecord", kind: 3},					
//    {label: "SoundInSet", kind: 3},						
//    {label: "SoundInStartChart", kind: 3},				
//    {label: "SoundInStatus", kind: 3},					
//    {label: "SoundInStopChart", kind: 3},				
//    {label: "SoundLoadWave", kind: 3},					
//    {label: "SoundSaveWave", kind: 3},					
//    {label: "SphericalInterpolate", kind: 3},			
//    {label: "SphericalTriangulate", kind: 3},			
//    {label: "SplitString", kind: 3},						
//    {label: "SplitWave", kind: 3},						
//    {label: "sprintf", kind: 3},							
//    {label: "sscanf", kind: 3},							
//    {label: "Stack", kind: 3},							
//    {label: "StackWindows", kind: 3},					
//    {label: "StatsAngularDistanceTest", kind: 3},		
//    {label: "StatsANOVA1Test", kind: 3},					
//    {label: "StatsANOVA2NRTest", kind: 3},				
//    {label: "StatsANOVA2RMTest", kind: 3},				
//    {label: "StatsANOVA2Test", kind: 3},					
//    {label: "StatsChiTest", kind: 3},					
//    {label: "StatsCircularCorrelationTest", kind: 3},	
//    {label: "StatsCircularMeans", kind: 3},				
//    {label: "StatsCircularMoments", kind: 3},			
//    {label: "StatsCircularTwoSampleTest", kind: 3},		
//    {label: "StatsCochranTest", kind: 3},				
//    {label: "StatsContingencyTable", kind: 3},			
//    {label: "StatsDIPTest", kind: 3},					
//    {label: "StatsDunnettTest", kind: 3},				
//    {label: "StatsFriedmanTest", kind: 3},				
//    {label: "StatsFTest", kind: 3},						
//    {label: "StatsHodgesAjneTest", kind: 3},				
//    {label: "StatsJBTest", kind: 3},						
//    {label: "StatsKDE", kind: 3},						
//    {label: "StatsKendallTauTest", kind: 3},				
//    {label: "StatsKSTest", kind: 3},						
//    {label: "StatsKWTest", kind: 3},						
//    {label: "StatsLinearCorrelationTest", kind: 3},		
//    {label: "StatsLinearRegression", kind: 3},			
//    {label: "StatsMultiCorrelationTest", kind: 3},		
//    {label: "StatsNPMCTest", kind: 3},					
//    {label: "StatsNPNominalSRTest", kind: 3},			
//    {label: "StatsQuantiles", kind: 3},					
//    {label: "StatsRankCorrelationTest", kind: 3},		
//    {label: "StatsResample", kind: 3},					
//    {label: "StatsSample", kind: 3},						
//    {label: "StatsScheffeTest", kind: 3},				
//    {label: "StatsShapiroWilkTest", kind: 3},			
//    {label: "StatsSignTest", kind: 3},					
//    {label: "StatsSRTest", kind: 3},						
//    {label: "StatsTTest", kind: 3},						
//    {label: "StatsTukeyTest", kind: 3},					
//    {label: "StatsVariancesTest", kind: 3},				
//    {label: "StatsWatsonUSquaredTest", kind: 3},			
//    {label: "StatsWatsonWilliamsTest", kind: 3},			
//    {label: "StatsWheelerWatsonTest", kind: 3},			
//    {label: "StatsWilcoxonRankTest", kind: 3},			
//    {label: "StatsWRCorrelationTest", kind: 3},			
//    {label: "STFT", kind: 3},							
//    {label: "String", kind: 3},							
//    {label: "StructFill", kind: 3},						
//    {label: "StructGet", kind: 3},						
//    {label: "StructPut", kind: 3},						
//    {label: "SumDimension", kind: 3},					
//    {label: "SumSeries", kind: 3},						
//    {label: "TabControl", kind: 3},						
//    {label: "Tag", kind: 3},								
//    {label: "TestOperation", kind: 3},					
//    {label: "Text2Bezier", kind: 3},						
//    {label: "TextBox", kind: 3},							
//    {label: "TextHistogram", kind: 3},					
//    {label: "ThreadGroupPutDF", kind: 3},				
//    {label: "ThreadStart", kind: 3},						
//    {label: "TickWavesFromAxis", kind: 3},				
//    {label: "Tile", kind: 3},							
//    {label: "TileWindows", kind: 3},						
//    {label: "timetest", kind: 3},						
//    {label: "TitleBox", kind: 3},						
//    {label: "ToCommandLine", kind: 3},					
//    {label: "ToolsGrid", kind: 3},						
//    {label: "Triangulate3d", kind: 3},					
//    {label: "Unwrap", kind: 3},							
//    {label: "UnzipFile", kind: 3},						
//    {label: "URLRequest", kind: 3},						
//    {label: "ValDisplay", kind: 3},						
//    {label: "Variable", kind: 3},						
//    {label: "WaveMeanStdv", kind: 3},		
//    {label: "WaveMeanStdv", kind: 3},					
//    {label: "WaveStats", kind: 3},						
//    {label: "WaveTracking", kind: 3},					
//    {label: "WaveTransform", kind: 3},					
//    {label: "wfprintf", kind: 3},						
//    {label: "WignerTransform", kind: 3},					
//    {label: "WindowFunction", kind: 3},					
//    {label: "XLLoadWave", kind: 3},
// ];
