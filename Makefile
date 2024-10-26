object_name := necronomicon
output_dir := dist
db_dir := db

build:
	go build -o $(object_name) ./src/*.go;
	mv $(object_name) $(output_dir)

run:
	./$(output_dir)/$(object_name)

clean:
	rm -rf $(output_dir)/$(object_name);
	find $(db_dir) -type f ! -name ".gitkeep" -delete
	find $(db_dir) -type d ! -name "." -empty -delete
